/*******************TEST CODE*******************

EXECUTE [dbo].[FileTypes_SelectAll]


***********************************************/
CREATE PROC [dbo].[FileTypes_SelectAll]

AS

BEGIN

	SELECT [Id], [Name]

	FROM [dbo].[FileTypes]

END
GO
