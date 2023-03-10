CREATE proc [dbo].[PageTranslations_Select_PageByLanguage]
		@Link nvarchar(255)
		,@LanguageId int
as

/*
	Declare @Link nvarchar(255)  = 'Something10'
			,@LanguageId int = 2

	Execute [dbo].[PageTranslations_Select_PageByLanguage] @Link
															,@LanguageId

															select *
															from pageTranslations

*/
BEGIN

SELECT [Id]
      ,[LanguageId]
      ,[Link]
      ,[Name]
      ,[DateCreated]
      ,[DateModified]
      ,[CreatedBy]
      ,[IsActive]
  FROM [dbo].[PageTranslations]
  WHERE Link = @Link 
		AND 
		LanguageId = @LanguageId 
		AND 
		IsActive = 1

END
GO
