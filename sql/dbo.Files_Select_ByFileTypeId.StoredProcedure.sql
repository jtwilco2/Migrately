/*******************TEST CODE*******************

DECLARE @FileTypeId int = 4
		,@PageIndex int = 0
		,@PageSize int = 10

EXECUTE [dbo].[Files_Select_ByFileTypeId]
		@FileTypeId
		,@PageIndex
		,@PageSize

***********************************************/
CREATE PROC [dbo].[Files_Select_ByFileTypeId]
			@FileTypeId int
			,@PageIndex int
			,@PageSize int

AS

BEGIN

	DECLARE @offset int = @PageIndex * @PageSize

	SELECT [F].[Id]
			  ,[F].[Name]
			  ,[Url]
			  ,[FileTypeId]
			  ,[FT].[Name]
			  ,[IsDeleted]
			  ,[CreatedBy]
			  ,[DateCreated]
			  ,[TotalCount] = COUNT(1) OVER()


	  FROM [dbo].[Files] as F inner join [dbo].[FileTypes] as FT
	  ON F.FileTypeId = FT.Id
	  WHERE [F].FileTypeId = @FileTypeId

	  ORDER BY F.Id

		OFFSET @offSet Rows
		Fetch Next @PageSize Rows ONLY 

END
GO
