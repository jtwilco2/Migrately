CREATE proc [dbo].[PageTranslations_SelectAllV2]
		 @PageIndex int
		,@PageSize Int

as

/* <--- TEST CODE SELECTBYLANGUAGE --->

Declare
			 @PageIndex Int = 0
			,@PageSize Int = 10

EXECUTE [dbo].[PageTranslations_SelectAllV2]
			 @PageIndex
			,@PageSize

   <--- TEST CODE SELECTBYLANGUAGE ---> */

BEGIN

Declare @offset int = @PageIndex * @PageSize

SELECT 
		 translation.Id
		,Link
		,Language =		(
						 SELECT	 Id
								,Code
								,Name
						FROM dbo.Languages
						WHERE Id = translation.LanguageId
						FOR JSON AUTO
						)
		,pageSection = (
						 SELECT	 Id
								,Section
								,component
								,pageTranslationId
								,keyValues =	(
												 SELECT  pSK.Id as sectionKeyId
														,KeyName as sectionName
														,pSC.Text as KeyContent
														,pSC.Id as contentId
												 FROM dbo.PageSectionKeys as pSK inner join dbo.PageSectionContent as pSC
												 ON pSC.PageSectionKeyId = pSK.Id
												 WHERE pSk.Id = pSC.PageSectionKeyId
												 FOR JSON PATH 
												)
						 FROM dbo.PageSection
						 WHERE PageTranslationId = translation.Id
						 FOR JSON AUTO
						)
	  ,TotalCount = COUNT(1) OVER()

  FROM [dbo].[PageTranslations] as translation
  
  ORDER by Id

  OFFSET @offset Rows
	Fetch Next @PageSize Rows Only

END
GO
